import { renderHook } from "@testing-library/react-hooks";
import {
  MockedFunction,
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useLanguages } from "../useLanguages";
import axios from "axios";

vi.mock("axios");

const mockedLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
];

describe("useLanguages", () => {
  beforeAll(() => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockedLanguages,
    });
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("should return an array of languages", async () => {
    const hook = renderHook(() => useLanguages());
    expect(axios.get).toBeCalledWith("https://libretranslate.com/languages");
    await hook.waitForNextUpdate();
    expect(hook.result.current.languages).toEqual(mockedLanguages);
  });
});
