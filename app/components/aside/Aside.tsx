import "./Aside.css";

export const Aside = ({
  url,
  children,
  title,
}: {
  url: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <aside className="Aside">
      <div className="Aside__share">
        <h2>Share</h2>
        <div className="SocialRow">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
          >
            <i className="ph ph-facebook-logo" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
            target="_blank"
          >
            <i className="ph ph-x-logo" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url.replace(
              /^https:\/\//,
              ""
            )}`}
            target="_blank"
          >
            <i className="ph ph-linkedin-logo" />
          </a>
        </div>
      </div>
      {children}
    </aside>
  );
};
