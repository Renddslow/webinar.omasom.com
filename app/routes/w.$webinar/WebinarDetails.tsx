import { useCallback, useMemo, useState } from "react";
import { useLoaderData, useMatches } from "@remix-run/react";

import type { loader } from "./route";
import { Page } from "~/components/page/Page";
import { Input } from "~/components/form/Input";
import { Select } from "~/components/form/Select";
import { WebinarForm } from "~/components/form/WebinarForm";
import { Checkbox } from "~/components/form/Checkbox";
import { Button } from "~/components/button/Button";

export function WebinarDetails() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();

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
          value=""
          onChange={(e) => {
            console.log(e);
          }}
        />
        <Checkbox
          label="I would like to receive emails about Omaha School of Ministry"
          name="send-more"
        />
        <Button type="submit">Register for this event</Button>
      </>
    );
  }, []);

  return (
    <Page.Section>
      <div className="header">
        <div className="title">
          <p>{data?.webinar.startsAt}</p>
          <h1>{data?.webinar.title}</h1>
        </div>
        <p>{data?.webinar.description}</p>
      </div>
      <WebinarForm>{renderForm()}</WebinarForm>
    </Page.Section>
  );
}
