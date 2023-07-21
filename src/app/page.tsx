'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]/route';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();
  let providers = authOptions.providers;
  let code = [1 - 2 - 3 - 4 - 5];
  return (
    <main className=' min-h-screen p-20 text-2xl leading-9'>
      <div className='flex gap-5'>
        {!!session ? (
          <div>
            <button className='p-2 bg-sky-400 hover:bg-sky-500 cursor-pointer' onClick={() => signOut()}>
              Sign out &#187;
            </button>
          </div>
        ) : (
          <>
            <button
              className='p-2 bg-sky-400 hover:bg-sky-500 cursor-pointer'
              onClick={() => signIn('github', { callbackUrl: '/hello' })}
            >
              Sign in &#187;
            </button>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className='p-2 bg-sky-400 hover:bg-sky-500 cursor-pointer'
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <p> ClientComponent {status}</p>
      <div>
        {session?.user?.image && (
          <Image src={session.user.image} alt={session.user.name!} width={50} height={50} className='inline' />
        )}{' '}
        {status === 'authenticated' && session.user?.name}
        {!!session && (
          <p>
            Secret Code <code>{code}</code>
          </p>
        )}
      </div>
    </main>
  );
}
