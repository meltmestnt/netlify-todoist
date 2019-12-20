import React from "react";
import ContentLoader from "react-content-loader";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
export default Component => {
  return ({ children, ...rest }) => {
    const [showChildren, toggle] = React.useState(false);
    React.useEffect(() => {
      setTimeout(() => toggle(true), 800);
    }, []);
    const theme = useTheme();
    const preloader = (
      <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor={
          theme.palette.type === "light" ? "#f3f3f3" : "rgba(210, 218, 226,0.4)"
        }
        secondaryColor={
          theme.palette.type === "light" ? "#f3f3f3" : "rgba(128, 142, 155,0.3)"
        }
      >
        <circle cx="10" cy="20" r="3" />
        <rect x="25" y="18.5" rx="5" ry="5" width="300" height="3" />
        <circle cx="10" cy="30" r="3" />
        <rect x="25" y="28.5" rx="5" ry="5" width="300" height="3" />
        <circle cx="10" cy="40" r="3" />
        <rect x="25" y="38.5" rx="5" ry="5" width="300" height="3" />
      </ContentLoader>
    );
    return (
      <>
        {showChildren ? (
          <Component {...rest} children={children}></Component>
        ) : (
          <Container
            style={{ padding: "25px 10px" }}
            className={rest.content || ""}
          >
            {preloader}
          </Container>
        )}
      </>
    );
  };
};
