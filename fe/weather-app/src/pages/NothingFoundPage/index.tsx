import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "./NothingFoundPage.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const NothingFoundPage = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Button
              size="md"
              renderRoot={({ className, ...others }) => (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    clsx(className, { "active-class": isActive })
                  }
                  {...others}
                />
              )}
            >
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default NothingFoundPage;
