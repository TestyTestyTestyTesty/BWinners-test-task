import { type ReactNode, type FC } from 'react';

interface LayoutProps {
  sidebar?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ sidebar, children, aside }) => {
  return (
    <div className="flex-col lg:flex-row flex justify-center max-w-[1200px] w-full mx-auto">
      {sidebar && sidebar}
      <main className="flex flex-col gap-4 pb-12 lg:pb-0 lg:px-4 w-full lg:max-w-[400px] lg:max-h-[calc(100vh-4rem)] overflow-y-auto">
        {children}
      </main>
      {aside && aside}
    </div>
  );
};
