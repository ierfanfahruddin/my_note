<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'config_bot';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
  die("Koneksi ke database gagal: " . $conn->connect_error);
}

// Ambil token, ID chat, dan API URL dari database
$query = "SELECT * FROM bot_telegram WHERE id = 1";
$result = $conn->query($query);
// var_dump($result->fetch_assoc());
// die;
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();

  // Ambil nilai dari database
  $token = $row['token'];
  $id_chat = $row['id_chat'];
  $api_url = $row['api_url'];

  // Pesan yang ingin Anda kirim
  $message = '<b>hehhe</b>';

  // URL endpoint Bot API Telegram
  $api_url = "$api_url/sendMessage";

  // Parameter untuk dikirim ke Bot API
  $data = [
    'chat_id' => $id_chat,
    'text' => $message,
    'parse_mode' => "html"
  ];

  // Mengirim permintaan ke Bot API menggunakan cURL
  $ch = curl_init($api_url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($ch);
  curl_close($ch);

  // Menangani respons dari Bot API
  if ($result) {
    $result_json = json_decode($result, true);
    if ($result_json && $result_json['ok']) {
      echo 'Pesan berhasil dikirim!';
    } else {
      echo 'Gagal mengirim pesan. Error: ' . $result;
    }
  } else {
    echo 'Gagal mengirim permintaan ke Bot API.';
  }
} else {
  echo 'Data konfigurasi bot tidak ditemukan.';
}

// Tutup koneksi ke database
$conn->close();
