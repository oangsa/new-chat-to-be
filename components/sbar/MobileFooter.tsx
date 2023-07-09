'use client';

import useConversation from "../hooks/useConversation";
import useRoutes from "../hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return ( 
    // fixed 
    // justify-between 
    // w-full 
    // bottom-0 
    // z-30 
    // flex 
    // items-center 
    // bg-white 
    // border-t-[1px] 
    <div 
      className="
        flex
        justtify-between
        w-full
        bottom-0
        z-30
        items-center
        border-t-[1px]
        bg-white
        fixed
      "
    >
      {routes.map((route) => (
        <MobileItem 
          key={route.href} 
          href={route.href} 
          active={route.active} 
          icon={route.icon}
        />
      ))}
    </div>
   );
}
 
export default MobileFooter;