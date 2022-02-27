import { createUseStyles } from "react-jss";
import Link from "next/link";
import { useRouter } from "next/router";

import Theme from "lib/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    width: "100%",
    display: "flex",
  },
  navButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  active: {
    textDecoration: "underline",
  },
}));

const UserNavBar: React.FC = () => {
  const styles = useStyles();
  const { query, asPath } = useRouter();

  const spotifyId = query.spotifyId as string;
  const currentPath = asPath.split(spotifyId)[1];

  return (
    <div className={styles.container}>
      <Link href={`/u/${spotifyId}`} passHref>
        <a
          className={`${styles.navButton} ${
            currentPath === "" ? styles.active : ""
          }`}
        >
          <p>{"Top"}</p>
        </a>
      </Link>
      <Link href={`/u/${spotifyId}/history`} passHref>
        <a
          className={`${styles.navButton} ${
            currentPath === "/history" ? styles.active : ""
          }`}
        >
          <p>{"History"}</p>
        </a>
      </Link>
    </div>
  );
};

export default UserNavBar;
