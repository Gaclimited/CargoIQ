import { Button } from "../components/ui/Button";

export function AccountPage() {
    return (
        <div className="container-page py-10">
            <h1 className="text-3xl font-bold text-ink-900">
                Account Settings
            </h1>

            <p className="mt-2 text-ink-500">
                Manage your CargoIQ account.
            </p>

            <div className="mt-8 space-y-6">

                <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">
                        Change Password
                    </h2>

                    <p className="mt-2 text-sm text-ink-500">
                        Update your password to keep your account secure.
                    </p>

                    <Button className="mt-5">
                        Change Password
                    </Button>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-red-700">
                        Danger Zone
                    </h2>

                    <p className="mt-2 text-sm text-red-600">
                        Deleting your account permanently removes all your saved trade analyses.
                        This action cannot be undone.
                    </p>

                    <Button
                        className="mt-5"
                        variant="outline"
                    >
                        Delete Account
                    </Button>
                </div>

            </div>
        </div>
    );
}