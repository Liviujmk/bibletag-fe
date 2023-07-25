import { Title } from "@mantine/core";
import { useHeroTitleStyles } from "./hero-title-styles";

interface Props {
  title?: string;
  children?: React.ReactNode;
  center?: boolean;
}

export const HeroTitle = ({ title, children, center }: Props) => {
  const { classes } = useHeroTitleStyles();
  return (
    <Title className={classes.title} align={center ? "center" : undefined}>
      {children}
      {title}
    </Title>
  );
}