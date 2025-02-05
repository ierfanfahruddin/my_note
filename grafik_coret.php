<?php
$halfHourBefore = new DateTime();
$halfHourBefore->modify('-30 minutes');
$halfHourAfter = new DateTime();
$halfHourAfter->modify('+30 minutes');

$startTime = !empty($main['start_time'])
  ? (float)$main['start_time']
  : ((float)$halfHourBefore->format('H') + ((float)$halfHourBefore->format('i') / 60));

$endTime = !empty($main['end_time'])
  ? (float)$main['end_time']
  : ((float)$halfHourAfter->format('H') + ((float)$halfHourAfter->format('i') / 60));

$startTime = number_format($startTime, 2, '.', '');
$endTime = number_format($endTime, 2, '.', '');
?>



<style>
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    font-family: Arial, sans-serif;
  }

  .chart-container {
    width: 100%;
    max-width: 2000px;
    margin: 20px 0;
    height: auto;
  }

  .chart {
    width: 100%;
    height: auto;
  }

  .grid line {
    stroke: #bbb;
    stroke-dasharray: 2;
  }

  .grid path {
    display: none;
  }

  .point {
    stroke: black;
  }

  .lines {
    stroke-width: 2;
    fill: none;
  }

  .controls {
    margin-bottom: 20px;
    text-align: center;
  }

  .tooltips {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 3px;
    pointer-events: none;
    font-size: 12px;
    z-index: 99999;
  }

  .x-axis text,
  .y-axis-group text {
    font-family: Arial, sans-serif;
    font-size: 15px;
    fill: black;
  }
</style>
<div class="row">
  <div class="col-md-12">

    <div id="chart-container" class="chart-container">
      <svg
        class="chart"
        viewBox="0 0 2000 1000"
        preserveAspectRatio="xMidYMid meet"></svg>
    </div>
    
    <div class="tooltips" style="display:none;"></div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-5">
          <label>Gunakan grafik ini:</label>
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              id="ya"
              name="is_use"
              value="1"
              <?php if (empty(@$main['is_use']) || @$main['is_use'] == '1') echo 'checked'; ?>
              onclick="saveChartToDatabase()" />
            <label class="form-check-label" for="ya">Ya</label>
          </div>
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              id="tidak"
              name="is_use"
              value="0"
              <?php if (@$main['is_use'] == '0') echo 'checked'; ?>
              onclick="saveChartToDatabase()" />
            <label class="form-check-label" for="tidak">Tidak</label>
            <span class="text-secondary">jika dipilih tidak silahkan refresh</span>
          </div>

        </div>
        <div class="col-md-7 row flex-row">
          <label>Choose a category:</label>
          <div class="form-check col-md-2">
            <input
              type="radio"
              class="form-check-input"
              id="respirasi"
              name="category"
              value="respirasi"
              checked />
            <label class="form-check-label" for="respirasi">Respirasi</label>
          </div>
          <div class="form-check col-md-2">
            <input
              type="radio"
              class="form-check-input"
              id="nadi"
              name="category"
              value="nadi" />
            <label class="form-check-label" for="nadi">Nadi</label>
          </div>
          <div class="form-check col-md-2">
            <input
              type="radio"
              class="form-check-input"
              id="suhuu"
              name="category"
              value="suhu" />
            <label class="form-check-label" for="suhuu">Suhu</label>
          </div>
          <div class="form-check col-md-2">
            <input
              type="radio"
              class="form-check-input"
              id="spo2"
              name="category"
              value="spO2" />
            <label class="form-check-label" for="spo2">SpO2</label>
          </div>
          <div class="form-check col-md-2">
            <input
              type="radio"
              class="form-check-input"
              id="sistol"
              name="category"
              value="Sistol" />
            <label class="form-check-label" for="sistol">Sistol</label>
          </div>
          <div class="form-check col-md-2">
            <input
              type="radio"
              class="form-check-input"
              id="diastol"
              name="category"
              value="Diastol" />
            <label class="form-check-label" for="diastol">diastol</label>
          </div>
        
        </div>

      </div>

      <div class="row col-6 container fw-4 fw-bold">

        <div class="col-md-6">
          <div class="form-group">
            <label for="start-time">Start Time (HH:MM):</label>
            <input
              type="text"
              class="form-control"
              id="start-time" value="<?= $startTime ?>"
              placeholder="13" />
          </div>
          <div class="form-group">
            <label for="end-time">End Time (HH:MM):</label>
            <input
              type="text"
              class="form-control"
              id="end-time" value="<?= $endTime ?>"
              placeholder="14" />
          </div>

          <div class="col-9 offset-3">
            <button class="btn btn-info mt-2" id="update-x-axis">Update Jam</button>
            <button type="button" class="btn btn-default" data-bs-dismiss="modal"><?= _icon('cancel') ?> Tutup</button>
          </div>
        </div>
      </div>
    </div>

    <input type="hidden" name="grafik_image2" id="grafik_image2" value="">

  </div>
</div>
<script>
  function resetAllVariables() {
    <?php if (@$main['is_use'] == '1'): ?>
      is_save_gambar = false;
    <?php endif; ?>
    // Reset margin
    window.margin = {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100
    };

    // Inisialisasi ulang semua variabel yang ada
    const svg = d3.select(".chart");
    const width = 2000 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    // Menetapkan nilai startTime dan endTime dalam JavaScript
    const startTime = <?= $startTime ?>;
    const endTime = <?= $endTime ?>;

    // Scales
    let xScale = d3.scaleLinear().domain([startTime, endTime]).range([0, width]);
    const yScaleCategory = {
      "jumlah": d3.scaleLinear().domain([0, 200]).range([height, 10]),
    };

    // Axes
    let xAxis = d3
      .axisBottom(xScale)
      .tickValues(d3.range(startTime, endTime + 0.1, 0.1))
      .tickFormat(d3.format(".2f"));
    let xGrid = d3
      .axisBottom(xScale)
      .tickSize(-height)
      .tickValues(d3.range(startTime, endTime + 0.1, 0.1))
      .tickFormat("");

    const yGrid = d3
      .axisLeft(yScaleCategory["jumlah"])
      .tickSize(-width)
      .tickFormat("");

    // Append SVG group for chart content
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add grid lines
    chartGroup.append("g").attr("class", "grid x-grid").call(xGrid);
    chartGroup.append("g").attr("class", "grid y-grid").call(yGrid);

    // Add X-axis
    chartGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    // Add Y-axes for each category
    const yAxisCategoryGroup = chartGroup
      .append("g")
      .attr("class", "y-axis-group");

    ["jumlah"].forEach((category, index) => {
      yAxisCategoryGroup
        .append("g")
        .attr("class", `y-axis-${category}`)
        .attr("transform", `translate(${index * 50},0)`)
        .call(d3.axisLeft(yScaleCategory[category]).ticks(10));

      const categoryText = category.charAt(0).toUpperCase() + category.slice(1);
      chartGroup
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", index * 100)
        .attr("y", height + 40)
        .text(categoryText);
    });

    // Data and line groups
    <?php if (@$main['chart_data'] == ''): ?>
      const points = {
        respirasi: [],
        nadi: [],
        suhu: [],
        spO2: [],
        Sistol: [],
        Diastol: []
      };
    <?php else: ?>
      const points = <?= html_entity_decode(@$main['chart_data']) ?>;
    <?php endif; ?>

    const lineGroups = {
      respirasi: chartGroup.append("path").attr("class", "lines").attr("stroke", "blue"),
      nadi: chartGroup.append("path").attr("class", "lines").attr("stroke", "green"),
      suhu: chartGroup.append("path").attr("class", "lines").attr("stroke", "red"),
      spO2: chartGroup.append("path").attr("class", "lines").attr("stroke", "purple"),
      Sistol: chartGroup.append("path").attr("class", "lines").attr("stroke", "orange"),
      Diastol: chartGroup.append("path").attr("class", "lines").attr("stroke", "brown"),
    };

    // Tooltips
    const tooltips = d3.select(".tooltips");

    // Event listeners
    svg.on("mousemove", function(event) {
      const [x, y] = d3.pointer(event);
      tooltips
        .style("left", `${x + -20}px`)
        .style("top", `${y + -20}px`)
        .style("display", "inline-block")
        .style("z-index", "9999")
        .html(
          `X: ${xScale.invert(x - margin.left).toFixed(2)}, Y: ${yScaleCategory["jumlah"]
            .invert(y - margin.top)
            .toFixed(2)}`
        );
    });

    svg.on("mouseleave", () => tooltips.style("display", "none"));

    svg.on("click", function(event) {
      const [x, y] = d3.pointer(event);
      const category = document.querySelector('input[name="category"]:checked').value;
      const pointIndex = points[category].findIndex(
        (point) =>
        Math.abs(point.x - (x - margin.left)) < 10 &&
        Math.abs(point.y - (y - margin.top)) < 10
      );

      if (pointIndex >= 0) {
        points[category].splice(pointIndex, 1);
      } else {
        points[category].push({
          x: x - margin.left,
          y: y - margin.top
        });
      }
      updateLine(category);
      updatePoints(category);
      setTimeout(() => {
        saveChartToDatabase();
      }, 1000);
    });

    function updateLine(category) {
      const lineGenerator = d3
        .line()
        .x((d) => d.x)
        .y((d) => d.y);
      lineGroups[category].attr("d", lineGenerator(points[category]));
    }

    function updatePoints(category) {
      chartGroup.selectAll(`.point-${category}`).remove();
      chartGroup
        .selectAll(`.point-${category}`)
        .data(points[category])
        .enter()
        .append("circle")
        .attr("class", `point-${category} point`)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 3)
        .attr("fill", lineGroups[category].attr("stroke"));
    }

    function updateXAxis(start, end) {
      xScale.domain([start, end]);
      xAxis.scale(xScale).tickValues(d3.range(start, end + 0.1, 0.1));
      xGrid.scale(xScale).tickValues(d3.range(start, end + 0.1, 0.1));
      chartGroup.select(".x-axis").call(xAxis);
      chartGroup.select(".x-grid").call(xGrid);
    }

    // Event listeners for controls
    document
      .getElementById("update-x-axis")
      .addEventListener("click", function() {
        const startTime = document.getElementById("start-time").value;
        const endTime = document.getElementById("end-time").value;
        updateXAxis(parseFloat(startTime), parseFloat(endTime));
      });

    $("input[name='is_use']").on("click", function() {
      saveChartToDatabase();
    });

    function updateChart() {
      const categories = ["respirasi", "nadi", "suhu", "spO2", "Sistol", "Diastol"];
      categories.forEach((category) => {
        updateLine(category);
        updatePoints(category);
      });
    }

    function saveChartToDatabase() {
      
      capture_image_to_input();
      const chartData = {};
      if (document.querySelector('input[name="is_use"]:checked').value == 0) {
        is_save_gambar = true;
      } else {
        is_save_gambar = false;
      }
      $.ajax({
        url: '<?= site_url() . '/penunjang/penunjang/save_grafik_fisiologis?n=' .  _get('n') ?>',
        type: 'POST',
        data: {
          anastesi_id: '<?= @$anastesi_id ?>',
          pelayanan_id: '<?= @$pelayanan_id ?>',
          grafikanastesi_id: '<?= @$main['grafikanastesi_id'] ?>',
          chart_data: JSON.stringify(points),
          grafik_image: document.querySelector('input[name="grafik_image2"]').value,
          is_use: document.querySelector('input[name="is_use"]:checked').value,
          start_time: parseFloat(document.getElementById("start-time").value),
          end_time: parseFloat(document.getElementById("end-time").value)
        },
        success: function(data) {
          _toast("success", "Berhasil Menyimpan");
        },
        error: function(xhr, status, error) {
          _toast("error", "Terjadi kesalahan sistem");
        }
      });
    }

    function capture_image_to_input() {
      const chartContainer = document.getElementById("chart-container");

      if (!chartContainer) {
        console.error("Element 'chart-container' not found!");
        return;
      }

      chartContainer.style.display = "block";

      html2canvas(chartContainer, {
          backgroundColor: "#FFFFFF",
          useCORS: true,
        })
        .then((canvas) => {
          const dataURL = canvas.toDataURL("image/png");

          const grafikImageInput = document.querySelector('input[name="grafik_image"]');
          const grafikImageInput2 = document.querySelector('input[name="grafik_image2"]');
          if (grafikImageInput) {
            grafikImageInput.value = dataURL;
            grafikImageInput2.value = dataURL;
          } else {
            console.error("Input dengan name 'grafik_image2' tidak ditemukan.");
          }

          // Mengubah src dari elemen img dengan id grafik_image_view
          const grafikImageView = document.getElementById('grafik_image_view');
          if (grafikImageView) {
            grafikImageView.src = dataURL; // Update src dengan dataURL
          } else {
            console.error("Elemen dengan id 'grafik_image_view' tidak ditemukan.");
          }
        })
        .catch((error) => {
          console.error("Error capturing div:", error);
        });
    }

    setTimeout(() => {
      updateChart();
      setTimeout(() => {
        saveChartToDatabase();
      }, 1000);
    }, 1000);
  }
  // Fungsi untuk reset semua variabel ketika dibutuhkan
  resetAllVariables();
</script>