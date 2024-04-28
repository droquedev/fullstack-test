import { render } from "@testing-library/react";
import { Feed } from "api/src/feed/feed.entity";
import { MockedFunction, beforeAll, describe, expect, test, vi } from "vitest";
import { VisitedContextProvider } from "../../context/VisitedContextProvider";
import { Card } from "../Card";

const feed: Feed = {
  title: "test title",
  date: "2021-01-01",
  description: "test description",
  extract: "test",
  id: "1",
  thumbnail: {
    source: "test img",
    width: 100,
    height: 100,
  },
  url: "test url",
};

describe("renders Card component", () => {
  
  beforeAll(() => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }

    global.localStorage = localStorageMock;
  });
  
  test("should render Card component", () => {
    const page = render(
      <VisitedContextProvider>
        <Card feed={feed} />
      </VisitedContextProvider>,
    );

    expect(page.getByText("test title")).toBeDefined();
  });

  test("should render Card component with read status", () => {
    (global.localStorage.getItem as MockedFunction<typeof localStorage.getItem>).mockReturnValueOnce(JSON.stringify({ [feed.id]: true }));
    const page = render(
      <VisitedContextProvider>
        <Card feed={feed} />
      </VisitedContextProvider>,
    );

    expect(page.container.getElementsByClassName("visited")).toBeDefined();
  });
});
