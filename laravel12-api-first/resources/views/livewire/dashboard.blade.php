<x-layouts.app>
    <div class="text-xl">Halo, {{ auth()->user()->name }} 👋</div>

    <form action="{{ route('logout') }}" method="POST">
        @csrf
        <x-button type="submit">Logout</x-button>
    </form>
</x-layouts.app>

@code
use Illuminate\Support\Facades\Auth;

public function mount()
{
    if (!Auth::check()) {
        return redirect('/login');
    }
}
@endcode
