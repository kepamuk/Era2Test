import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth";
import { useNavigate } from "@/shared/routing";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [timeLeft, setTimeLeft] = useState(3 * 24 * 3600);

  useEffect(() => {
    const saved = localStorage.getItem("era2_signup_timer_start");
    if (!saved) {
      localStorage.setItem("era2_signup_timer_start", String(Date.now()));
    } else {
      const elapsed = Math.floor((Date.now() - parseInt(saved)) / 1000);
      setTimeLeft(Math.max(0, 3 * 24 * 3600 - elapsed));
    }
    const interval = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  useEffect(() => {
    document.title = mode === "login" ? "ERA2 — Вход" : "ERA2 — Регистрация";
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate({ to: "/" });
  };

  const handleSocial = () => {
    login();
    navigate({ to: "/" });
  };

  const SocialButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button
      type="button"
      onClick={handleSocial}
      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-[14px] text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-accent/40"
      style={{
        background: "hsl(var(--secondary))",
        border: "1px solid hsl(var(--border))",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const inputStyle = {
    background: "hsl(var(--secondary))",
    border: "1px solid hsl(var(--border))",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,84,32,0.12) 0%, transparent 60%), hsl(var(--background))",
      }}
    >
      <div
        className="w-full max-w-md rounded-[22px] p-8 shadow-xl"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
        }}
      >
        {/* Logo */}
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
            boxShadow: "0 8px 22px -8px rgba(232,84,32,0.55)",
          }}
        >
          E
        </div>

        <h1 className="text-2xl font-bold text-center text-foreground mb-2">
          {mode === "login" ? "Вход в ERA2" : "Создать аккаунт"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-7">
          {mode === "login"
            ? "90+ нейросетей в одном месте"
            : "Получите 100 бесплатных кредитов при регистрации"}
        </p>

        {mode === "register" && (
          <div
            className="rounded-[12px] p-3 text-center mb-4"
            style={{
              background: "rgba(232,84,32,0.1)",
              border: "1px solid rgba(232,84,32,0.2)",
            }}
          >
            <div className="text-[13px] font-medium" style={{ color: "hsl(var(--primary))" }}>
              +100 кредитов на 3 дня для генерации!
            </div>
            <div className="text-xl font-mono font-bold mt-1 text-foreground">
              {pad(hours)} : {pad(mins)} : {pad(secs)}
            </div>
          </div>
        )}

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <SocialButton icon={<span className="text-base">✈️</span>} label="Telegram" />
          <SocialButton icon={<span className="text-base font-bold text-[#FC3F1D]">Я</span>} label="Яндекс" />
          <SocialButton icon={<span className="text-base">G</span>} label="Google" />
          <SocialButton icon={<span className="text-base font-bold text-[#0077FF]">VK</span>} label="VK" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">или по email</span>
          <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-[14px] text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/20"
                style={inputStyle}
              />
            </div>
          )}

          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-[14px] text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/20"
              style={inputStyle}
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-11 py-3 rounded-[14px] text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/20"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {mode === "login" && (
            <div className="text-right">
              <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Забыли пароль?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[14px] text-sm font-semibold text-white transition-all hover:opacity-95"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
              boxShadow: "0 8px 22px -8px rgba(232,84,32,0.55)",
            }}
          >
            <span>{mode === "login" ? "Войти" : "Создать аккаунт"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle mode */}
        <p className="text-sm text-muted-foreground text-center mt-6">
          {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-primary font-medium hover:underline"
          >
            {mode === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>

        {/* Footer */}
        <p className="text-[11px] text-muted-foreground text-center mt-6 leading-relaxed">
          Регистрируясь, вы соглашаетесь с{" "}
          <a href="#" className="underline hover:text-foreground">обработкой персональных данных</a>{" "}
          и{" "}
          <a href="#" className="underline hover:text-foreground">условиями использования</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
