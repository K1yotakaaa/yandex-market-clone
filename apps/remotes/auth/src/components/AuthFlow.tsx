import { useState } from 'react';
import { useAuthStore } from '@marketplace/shared-state';
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
  getPasswordStrength,
} from '../lib/validation';
import { AppleIcon, GithubIcon, GoogleIcon, LockIcon, MailIcon, UserIcon } from './icons';
import styles from './AuthFlow.module.css';

type View = 'login' | 'register' | 'forgot';

export function AuthFlow() {
  const [view, setView] = useState<View>('login');

  return (
    <div className={styles.container}>
      {view === 'login' && <LoginForm onSwitch={setView} />}
      {view === 'register' && <RegisterForm onSwitch={setView} />}
      {view === 'forgot' && <ForgotForm onSwitch={setView} />}
    </div>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
  onBlur,
  type = 'text',
  error,
  touched,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
  error?: string;
  touched: boolean;
}) {
  const showError = touched && !!error;
  return (
    <div className={styles.field}>
      <input
        className={showError ? `${styles.input} ${styles.inputError}` : styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={showError || undefined}
        aria-describedby={showError ? `${placeholder}-error` : undefined}
      />
      <span className={styles.icon}>{icon}</span>
      {showError && (
        <p id={`${placeholder}-error`} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordStrengthBar({ password }: { password: string }) {
  const { level, label } = getPasswordStrength(password);
  if (!password) return null;
  return (
    <div className={styles.strengthWrap}>
      <div className={styles.strengthBars}>
        <span className={level >= 1 ? `${styles.strengthBar} ${styles.strengthBar1}` : styles.strengthBar} />
        <span className={level >= 2 ? `${styles.strengthBar} ${styles.strengthBar2}` : styles.strengthBar} />
        <span className={level >= 3 ? `${styles.strengthBar} ${styles.strengthBar3}` : styles.strengthBar} />
      </div>
      <span className={`${styles.strengthLabel} ${styles[`strengthLabel${level}`]}`}>{label}</span>
    </div>
  );
}

function LoginForm({ onSwitch }: { onSwitch: (v: View) => void }) {
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ username: false, password: false });

  const usernameCheck = validateUsername(username);
  const passwordCheck = validatePassword(password);
  const formValid = usernameCheck.valid && passwordCheck.valid;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!formValid) return;

    const res = login(username, password);
    if (!res.ok) {
      if (res.error === 'User not found') setError('Пользователь с таким именем не найден');
      else if (res.error === 'Invalid password') setError('Неверный пароль');
      else setError(res.error ?? 'Ошибка входа');
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Welcome Back</h1>
        <p>Log in to continue your journey</p>
      </header>

      <form className={styles.form} onSubmit={submit} noValidate>
        <Field
          icon={<UserIcon />}
          placeholder="Username"
          value={username}
          onChange={setUsername}
          onBlur={() => setTouched((t) => ({ ...t, username: true }))}
          error={usernameCheck.error}
          touched={touched.username}
        />
        <Field
          icon={<LockIcon />}
          placeholder="Password"
          value={password}
          onChange={setPassword}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          type="password"
          error={passwordCheck.error}
          touched={touched.password}
        />

        <button type="submit" className={styles.submit} disabled={touched.username && touched.password && !formValid}>
          Log In
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.divider}><span>or continue with</span></div>

        <div className={styles.socials}>
          <button type="button" className={styles.social} aria-label="Google"><GoogleIcon /></button>
          <button type="button" className={styles.social} aria-label="Apple"><AppleIcon /></button>
          <button type="button" className={styles.social} aria-label="GitHub"><GithubIcon /></button>
        </div>

        <div className={styles.footer}>
          <a onClick={() => onSwitch('forgot')} className={styles.link}>Forgot password?</a>
          <p className={styles.footerText}>
            Don&apos;t have an account?{' '}
            <a onClick={() => onSwitch('register')} className={styles.link}>Sign up</a>
          </p>
        </div>
      </form>
    </>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: (v: View) => void }) {
  const register = useAuthStore((s) => s.register);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirm: false,
  });

  const usernameCheck = validateUsername(username);
  const emailCheck = validateEmail(email);
  const passwordCheck = validatePassword(password);
  const confirmCheck = validateConfirmPassword(password, confirm);
  const formValid =
    usernameCheck.valid && emailCheck.valid && passwordCheck.valid && confirmCheck.valid;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true, confirm: true });
    if (!formValid) return;

    const res = register(username, email, password);
    if (!res.ok) setError(res.error ?? 'Ошибка регистрации');
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Create Account</h1>
        <p>Join us and start shopping!</p>
      </header>

      <form className={styles.form} onSubmit={submit} noValidate>
        <Field
          icon={<UserIcon />}
          placeholder="Username"
          value={username}
          onChange={setUsername}
          onBlur={() => setTouched((t) => ({ ...t, username: true }))}
          error={usernameCheck.error}
          touched={touched.username}
        />
        <Field
          icon={<MailIcon />}
          placeholder="Email"
          value={email}
          onChange={setEmail}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          type="email"
          error={emailCheck.error}
          touched={touched.email}
        />
        <div>
          <Field
            icon={<LockIcon />}
            placeholder="Password"
            value={password}
            onChange={setPassword}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            type="password"
            error={passwordCheck.error}
            touched={touched.password}
          />
          <PasswordStrengthBar password={password} />
        </div>
        <Field
          icon={<LockIcon />}
          placeholder="Confirm"
          value={confirm}
          onChange={setConfirm}
          onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
          type="password"
          error={confirmCheck.error}
          touched={touched.confirm}
        />

        <button
          type="submit"
          className={styles.submit}
          disabled={Object.values(touched).every(Boolean) && !formValid}
        >
          Sign Up
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.footerText}>
          Already have an account?{' '}
          <a onClick={() => onSwitch('login')} className={styles.link}>Log in</a>
        </p>
      </form>
    </>
  );
}

function ForgotForm({ onSwitch }: { onSwitch: (v: View) => void }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailCheck = validateEmail(email);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailCheck.valid) return;
    setSent(true);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Reset Password</h1>
        <p>Enter your email and we&apos;ll send a reset link</p>
      </header>

      {sent ? (
        <div className={styles.success}>
          <p>If an account with <b>{email}</b> exists, a reset link has been sent.</p>
          <button className={styles.submit} onClick={() => onSwitch('login')}>
            Back to login
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <Field
            icon={<MailIcon />}
            placeholder="Email"
            value={email}
            onChange={setEmail}
            onBlur={() => setTouched(true)}
            type="email"
            error={emailCheck.error}
            touched={touched}
          />
          <button type="submit" className={styles.submit} disabled={touched && !emailCheck.valid}>
            Send reset link
          </button>
          <p className={styles.footerText}>
            <a onClick={() => onSwitch('login')} className={styles.link}>Back to login</a>
          </p>
        </form>
      )}
    </>
  );
}