import { useCallback } from "react";
import { useFetchers, useLoaderData } from "@remix-run/react";

import type { loader } from "./route";
import { Page } from "~/components/page/Page";
import { Input } from "~/components/form/Input";
import { Select } from "~/components/form/Select";
import { WebinarForm } from "~/components/form/WebinarForm";
import { Checkbox } from "~/components/form/Checkbox";
import { Button } from "~/components/button/Button";
import { PeopleGrid } from "~/components/peopleGrid/PeopleGrid";
import { Aside } from "~/components/aside/Aside";

import "./WebinarDetails.css";
import { Card } from "~/components/card/Card";

export function WebinarDetails() {
  const data = useLoaderData<typeof loader>();
  const fetchers = useFetchers();

  const [formFetcher] = fetchers.filter(
    (fetcher) => fetcher.key === "register"
  );

  const renderForm = useCallback(() => {
    return (
      <>
        <h2>Join the webinar.</h2>
        <Input
          name="first-name"
          label="First Name"
          value=""
          onChange={() => {}}
          required
        />
        <Input
          name="last-name"
          label="Last Name"
          value=""
          onChange={() => {}}
          required
        />
        <Input
          name="email"
          label="Email"
          value=""
          onChange={() => {}}
          required
        />
        <Select
          name="grade"
          label="Current Grade"
          options={[
            "9th Grade",
            "10th Grade",
            "11th Grade",
            "12th Grade",
            "High School Graduate",
            "Other",
          ]}
        />
        <Checkbox
          label="I would like to receive emails about Omaha School of Ministry"
          name="send-more"
        />
        <Button type="submit">Register for this event</Button>
      </>
    );
  }, []);

  const renderAside = useCallback(() => {
    return (
      <Aside
        url={data.webinar.url}
        title={`Join a free online webinar ('${data.webinar.title}')`}
      >
        <>
          <div className="Webinar__hosts">
            <div>
              <h2>Presenter{data.webinar.presenters.length > 1 ? "s" : ""}</h2>
              <PeopleGrid people={data.webinar.presenters} />
            </div>
            <div>
              <h2>Hosted By</h2>
              <PeopleGrid people={data.webinar.hosts} />
            </div>
          </div>
          <div className="Webinar__guests">
            {data.webinar.signups || 0} attendees registered
          </div>
        </>
      </Aside>
    );
  }, [data]);

  return (
    <div className="WebinarDetails">
      <Page.Section>
        <Page.SectionHeader
          meta={data?.webinar.startTime}
          subtitle={data?.webinar.description}
        >
          {data?.webinar.title}
        </Page.SectionHeader>
        {formFetcher?.state === "idle" ? (
          <Card>
            <Card.Title>Thank you!</Card.Title>
            <Card.Body>
              We are so excited to meet you.
              <br />
              We are praying that{" "}
              <Card.Highlight>this event will help equip you</Card.Highlight> in
              a small way for the ministry{" "}
              <Card.Highlight>God has called you to</Card.Highlight>.
            </Card.Body>
          </Card>
        ) : (
          <WebinarForm fetcherKey="register">{renderForm()}</WebinarForm>
        )}
      </Page.Section>
      {renderAside()}
    </div>
  );
}
