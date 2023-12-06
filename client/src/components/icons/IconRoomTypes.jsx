function IconRoomTypes(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="8" height="8" />
        <rect x="14" y="2" width="8" height="8" />
        <path d="M2 14h8v8H2z" />
        <path d="M14 14h8v8h-8z" />
        <path d="M5 5h2v2H5z" />
        <path d="M17 5h2v2h-2z" />
        <path d="M5 17h2v2H5z" />
        <path d="M17 17h2v2h-2z" />
      </svg>
    );
  }
  
  export default IconRoomTypes;
  