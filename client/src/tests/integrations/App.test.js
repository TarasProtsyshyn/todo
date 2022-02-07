import App from "../../react/App";
import { renderWithRedux, screen, waitForElementToBeRemoved } from "../test-utils";

import configureStore from "../../redux/configureStore";

const store = configureStore();

test("renders without fails", async () => {
  renderWithRedux(<App />, { store });

  await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
});
