import "./index.less";

interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  return (
    <nav className={`tooyea-nav ${className}`}>
      <a>
        <img src="./logo.jpeg" alt="logo" height="40" />
      </a>
    </nav>
  );
}
