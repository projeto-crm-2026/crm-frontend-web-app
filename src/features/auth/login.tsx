import { Input, Label } from 'crm-project-ui'
import { Loader2, LogIn } from 'lucide-react'
import { useState } from 'react'

import { useAuth } from './hooks/use-auth'
import { AuthLayout } from './layouts'

export function LoginFeature() {
  const { isLoading, error, handleLogin } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin({ email, password })
  }

  return (
    <AuthLayout>
      <div className="flex h-[30rem] w-[60rem] justify-between">
        <div className="h-full w-2/3">
          <img
            src="login.webp"
            className="h-full w-full"
            alt="Imagem ilustrativa sobre gestão"
          />
        </div>
        <div className="w-1/3 space-y-6 rounded-tr-2xl rounded-br-2xl border bg-white p-15 shadow-xl shadow-stone-800">
          <div className="space-y-2 text-center">
            <h2 className="text-foreground text-2xl font-bold tracking-tight">
              Bem-vindo de volta
            </h2>
            <p className="text-muted-foreground text-sm">
              Entre com suas credenciais para acessar o CRM
            </p>
          </div>

          <form onSubmit={onSubmit} className="w-full space-y-4">
            <div className="space-y-4">
              <Label
                htmlFor="email"
                className="text-foreground text-sm font-medium"
              >
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-muted/50"
              />
            </div>

            <div className="space-y-4">
              <Label
                htmlFor="password"
                className="text-foreground text-sm font-medium"
              >
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-muted/50"
              />
            </div>

            {error && (
              <div className="text-center text-xs text-red-500">
                Email ou senha incorretos
              </div>
            )}

            <button
              type="submit"
              className="flex h-10 w-full cursor-not-allowed items-center justify-center rounded-md bg-blue-600 font-semibold text-white disabled:bg-blue-300"
              disabled={isLoading || !email.trim() || !password.trim()}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              Entrar
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
