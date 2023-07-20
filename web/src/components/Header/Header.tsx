import { injectIntl } from "react-intl";
import MenuBar from "../MenuBar/MenuBar";
import { getIsLoggedIn } from "../../services/userInfoService";

type Props = {
  intl: any;
};

const Header = ({ intl }: Props) => {
  return (
    // <AppBar position="static">
    //   <Toolbar>
    //     <Typography variant="h6">CareerConnect</Typography>
    //   </Toolbar>
    // </AppBar>
    <MenuBar
      title={intl.formatMessage({ id: "global.app_title" })}
      noBtn={true}
      // isLoggedIn={getIsLoggedIn()}
    />
  );
};

export default injectIntl(Header);
