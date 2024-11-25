interface LogoProps {
  className?: string; // A propriedade className é opcional
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Aplicar a classe recebida
    >
      <path
        d="M24 4L44 24L24 44L4 24L24 4Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
