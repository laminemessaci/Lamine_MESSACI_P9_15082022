/**
 * @jest-environment jsdom
 */

import { screen, waitFor, fireEvent } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes";
import router from "../app/Router.js";

jest.mock("../app/store", () => mockStore);

describe("Given I am connected as an employee", () => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
  window.localStorage.setItem(
    "user",
    JSON.stringify({
      type: "Employee",
    })
  );
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.append(root);
  router();

  describe("When I am on NewBill Page", () => {
    test("Then Title text content should be displyed", async () => {
      window.onNavigate(ROUTES_PATH.NewBill);

      expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy();
    });

    test("Then mail icon in vertical layout should be highlighted", async () => {
      window.onNavigate(ROUTES_PATH.NewBill);

      await waitFor(() => screen.getByTestId("icon-mail"));
      const mailIcon = screen.getByTestId("icon-mail");
      expect(mailIcon.className).toBe("active-icon");
    });
  });

  describe("when I submit the form with empty fields", () => {
    test("then I should stay on new 'Bill page'", () => {
      // Navigate to the new page
      window.onNavigate(ROUTES_PATH.NewBill);
      // Create instant of newBill
      const newBill = new NewBill({
        document,
        onNavigate,
        mockStore,
        localStorage: window.localStorage,
      });

      expect(screen.getByTestId("expense-name").value).toBe("");
      expect(screen.getByTestId("datepicker").value).toBe("");
      expect(screen.getByTestId("amount").value).toBe("");
      expect(screen.getByTestId("vat").value).toBe("");
      expect(screen.getByTestId("pct").value).toBe("");
      expect(screen.getByTestId("file").value).toBe("");

      const form = screen.getByTestId("form-new-bill");
      // mock the function handleSubmit
      const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));

      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(handleSubmit).toHaveBeenCalled();
      expect(form).toBeTruthy();
    });
  });

   describe("when I upload a file with the wrong format", () => {
     test("then it should return an error message", async () => {
       document.body.innerHTML = NewBillUI();
       const onNavigate = (pathname) => {
         document.body.innerHTML = ROUTES({ pathname });
       };
      // Create instant of newBill 
       const newBill = new NewBill({
         document,
         onNavigate,
         mockStore,
         localStorage: window.localStorage,
       });
      // Create file with the unauthorized format 
       const file = new File(["hello"], "hello.txt", { type: "document/txt" });
       
       const inputFile = screen.getByTestId("file");
       // mock for handleChangeFile function 
       const handleChangeFile = jest.fn((e) => newBill.handleChangeFile(e));
       inputFile.addEventListener("change", handleChangeFile);

       fireEvent.change(inputFile, { target: { files: [file] } });

       expect(handleChangeFile).toHaveBeenCalled();
       expect(inputFile.files[0].type).toBe("document/txt");
       await waitFor(() => screen.getByTestId("file-error-message"));
       expect(screen.getByTestId("file-error-message").classList).not.toContain(
         "hidden"
       );
     });
   });
});
