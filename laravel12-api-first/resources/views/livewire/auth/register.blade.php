<x-layouts.guest>
    <form wire:submit="register" class="space-y-4">
        <x-input label="Name" wire:model.defer="name" />
        <x-input label="Email" type="email" wire:model.defer="email" />
        <x-input label="Password" type="password" wire:model.defer="password" />
        <x-button type="submit">Register</x-button>
    </form>
</x-layouts.guest>

@code
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

public string $name = '';
public string $email = '';
public string $password = '';

public function register()
{
    $this->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

    $user = User::create([
        'name' => $this->name,
        'email' => $this->email,
        'password' => Hash::make($this->password),
    ]);

    Auth::login($user);

    return redirect()->route('dashboard');
}
@endcode
