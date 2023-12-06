function IconRooms(props) {
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
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <line x1="10" y1="3" x2="10" y2="10" />
        <line x1="21" y1="3" x2="21" y2="10" />
        <line x1="10" y1="14" x2="10" y2="21" />
        <line x1="21" y1="14" x2="21" y2="21" />
      </svg>
    );
  }
  
  export default IconRooms;
  