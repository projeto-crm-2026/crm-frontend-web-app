import { Button, Input, Label } from 'crm-project-ui'
import { AlertCircle, Loader2, LogIn } from 'lucide-react'
import { useState } from 'react'

import { useAuth } from './hooks/use-auth'
import { AuthLayout } from './layouts'

export function LoginFeature() {
  const { isLoading, error, handleLogin, clearError } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin({ email, password })
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Bem-vindo de volta
          </h2>
          <p className="text-muted-foreground text-sm">
            Entre com suas credenciais para acessar o CRM
          </p>
        </div>

        {error && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg border px-4 py-3 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="flex-1">{error}</p>
            <button
              onClick={clearError}
              className="text-destructive/70 hover:text-destructive cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading || !email.trim() || !password.trim()}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            Entrar
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
