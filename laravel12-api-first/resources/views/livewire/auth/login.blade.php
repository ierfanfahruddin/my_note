<x-layouts.guest>
    <form wire:submit="login" class="space-y-4">
        <x-input label="Email" type="email" wire:model.defer="email" />
        <x-input label="Password" type="password" wire:model.defer="password" />
        <x-button type="submit">Login</x-button>
    </form>
</x-layouts.guest>

@code
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

public string $email = '';
public string $password = '';

public function login()
{
    if (! Auth::attempt([
        'email' => $this->email,
        'password' => $this->password,
    ], true)) {
        throw ValidationException::withMessages([
            'email' => ['Invalid credentials.'],
        ]);
    }

    return redirect()->route('dashboard');
}
@endcode
