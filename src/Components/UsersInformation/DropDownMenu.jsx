import React from "react";
import Button from "@mui/material/Button";
import courseIcon from "../../Icons/course.svg";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
      props.onHover(event);
    }
   
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      {props.currentSubscrioption.length == 0?<><Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        // onMouseOver={handleClick}
        // onMouseLeave={handleClose}
        sx={{background:props.currentSubscrioption.length == 0 && '#ff3000'}}
      >
        <Image src={courseIcon} height={30} width={90} />
      </Button></>:<><Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
        // onMouseLeave={handleClose}
        sx={{background:props.currentSubscrioption.length == 0 && '#ff3000'}}
      >
        <Image src={courseIcon} height={30} width={90} />
      </Button></>}
      
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        
        {props.currentSubscrioption.map((data) => (
          props.currentSubscrioption.length !== 0 && <MenuItem onClick={handleClose}>{data.course_name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SimpleMenu;
