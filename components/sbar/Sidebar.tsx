"use client"
import getCurrentUser from '@/libs/actions/getCurrentUser';

import MobileFooter from './MobileFooter';

async function Sidebar({ children }: {
  children: React.ReactNode,
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="">
      <MobileFooter />
      <main className="">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;
