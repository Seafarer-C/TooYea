import "./index.less";

interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  return (
    <nav className={`tooyea-nav ${className}`}>
      <a href="/">
        <img src="./logo.png" alt="logo" height="32" />
      </a>
    </nav>
  );
}
