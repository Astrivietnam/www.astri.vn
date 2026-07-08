import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminLoginPage({ params }: PageProps) {
  const { locale } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (token?.value) {
    redirect(`/${locale}/admin/dashboard`);
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f3d1a 0%, #1A6B2F 50%, #145c27 100%)',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          padding: '2.5rem 2rem',
          width: '100%',
          maxWidth: '420px',
        }}
      >
        <LoginForm locale={locale} />
      </div>
    </main>
  );
}
