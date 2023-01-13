import MainNavigation from "./MainNavigation";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <MainNavigation />
      {children}
    </div>
  );
};

export default Layout;
