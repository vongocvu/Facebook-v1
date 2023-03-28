
const icon = (position) => {
  return (
    <div className="">
      <i
        data-visualcompletion="css-img"
        className=""
        style={{
          "backgroundImage":
            "url(https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/BHDNlEdwMgn.png)",
          "backgroundPosition": `0 ${position}px`,
          "backgroundSize": "auto",
          width: "36px",
          height: "36px",
          "backgroundRepeat": "no-repeat",
          display: "inline-block",
        }}
      ></i>
    </div>
  );
};

const navBarHome = {
  navLeft: [
    {
      name: "Friends",
      icon: icon(-296),
      path: "/friends",
    },
    {
      name: "Saved",
      icon: icon(-185),
      path: "/saved",
    },
    {
      name: "Events",
      icon: icon(0),
      path: "/events",
    },
    {
      name: "Favorites",
      icon:  <img draggable="false" height="36" width="36" alt="" referrerPolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/mAnT0r8GSOm.png"/>,
      path: "/favorites",
    },
    {
      name: "Most Recent",
      icon: <img draggable="false" height="36" width="36" alt="" referrerPolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png"/>,
      path: "/recent",
    },
    {
      name: "Groups",
      icon: icon(-74),
      path: "/groups",
    },
    {
      name: "Marketplace",
      icon: icon(-407),
      path: "/marketplace",
    },
  ],
};

export default navBarHome;
