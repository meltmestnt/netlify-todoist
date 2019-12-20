import React from "react";
import ContentLoader from "react-content-loader";
import { useTheme } from "@material-ui/core/styles";
import { useSpring, animated, config } from "react-spring";

function PreloaderContainer({ children, list }) {
  const [showChildren, toggle] = React.useState(false);

  const theme = useTheme();
  const [animation, start, stop] = useSpring(() => ({
    from: { opacity: 0 },
    to: {
      opacity: 1
    },
    config: config.wobbly,
    onRest: () => {
      toggle(true);
      startAnim({
        from: { opacity: 0, transfrom: `translateX(10%)` },
        to: {
          opacity: 1,
          transfrom: `translateX(0%)`
        }
      });
    }
  }));
  React.useEffect(() => {
    setTimeout(() => {
      start({
        config: config.stiff,
        from: { transfrom: `translate(0,0)`, opacity: 1 },
        to: { transfrom: `translate(5%,0)`, opacity: 0 }
      });
    }, 500);
  }, [start]);
  const [animateChildren, startAnim] = useSpring(() => ({
    from: { opacity: 0 },
    to: {
      opacity: 1
    },
    onFrame: () => console.log("frame"),
    config: config.gentle
  }));
  const preloader = (
    <ContentLoader
      height={50}
      width={400}
      speed={1.5}
      primaryColor={
        theme.palette.type === "light" ? "#f3f3f3" : "rgba(210, 218, 226,0.4)"
      }
      secondaryColor={
        theme.palette.type === "light" ? "#ecebeb" : "rgba(128, 142, 155,0.3)"
      }
    >
      <circle cx="10" cy="20" r="3" />
      <rect x="25" y="18.5" rx="5" ry="5" width="100%" height="3" />
      <circle cx="10" cy="30" r="3" />
      <rect x="25" y="28.5" rx="5" ry="5" width="100%" height="3" />
      <circle cx="10" cy="40" r="3" />
      <rect x="25" y="38.5" rx="5" ry="5" width="100%" height="3" />
    </ContentLoader>
  );
  return !showChildren && list.length > 0 ? (
    <animated.div style={animation}>{preloader}</animated.div>
  ) : (
    <animated.div style={animateChildren}>{children}</animated.div>
  );
}

export default PreloaderContainer;
