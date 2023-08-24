import { useNavigate } from "react-router-dom";
import { Header, Segment, Icon } from "semantic-ui-react";
import useFirebaseImage from "../../hooks/useBadges";
import { CSSProperties } from "react";

function Badges() {
  const navigate = useNavigate();

  
  const certificationBadges = [
    "aws-certified-sysops-administrator-associate.png",
    "aws-certified-data-analytics-specialty.png",
    "consul.svg",
  ];
  const imageUrls = useFirebaseImage(certificationBadges);

  const badgeStyle: CSSProperties = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    margin: "5px",
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.03)",
    borderRadius: "2px",
  };

  return (
    <>
      <Header as="h3">Badges</Header>
      <Segment placeholder textAlign="center" className="hoverable">
        <Header icon as="h4">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${url} badge`}
                style={badgeStyle}
              />
            ))
          ) : (
            <>
              <Icon name="image outline" />
              Badges Not Found.
              <div className="empty-badge-gallery"></div>
            </>
          )}
        </Header>
      </Segment>
    </>
  );
}

export default Badges;
