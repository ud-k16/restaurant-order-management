import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useErrorContext } from "../context/useErrorContext";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const useHelpers = () => {
  const { showError } = useErrorContext();

  const { setItem: setMenu } = useAsyncStorage("menu");

  const fetchWithTimeOut = async ({ url, requestOptions, timeOut = 10000 }) => {
    console.log(
      "Fetch url : ",
      url,
      "\n Request Object : ",
      JSON.stringify(requestOptions, null, 4)
    );

    // creating new controller object
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const id = setTimeout(() => {
        // abort the fetch if it reached the wait time
        controller.abort();
        clearTimeout(id);
      }, timeOut);
      //   making fetch request
      const response = await fetch(url, { ...requestOptions, signal });
      //    return response
      return response;
    } catch (error) {
      console.log("Error occured in the Fetch With TimeOut Function", error);
      showError("Network Error,Check your internet");
      throw error;
    }
  };

  const handleResponseError = (error) => {
    try {
      if (error instanceof TypeError) {
        console.log("Network Error ");
        showError();
      } else if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Fetch request aborted");
        showError();
      } else console.log(error.message);
    } catch (error) {
      console.log("Error in handle Response Error function");
      showError();
    }
  };

  /**
   * common response handler
   * if status of response 200 then parses the response for data send by server
   * on unauthorized error [401] calls unauthorized error handler
   * @param {*} response
   * @returns result object server sends
   */
  const handleResponse = async (response) => {
    try {
      if (response.status === 200) {
        const result = await response.json();
        return result;
      } else if (response.status === 401) {
        showError();
      } else if (response.status === 500) {
        showError();
        // internal server error
      } else if (response.status === 400) {
        // bad request
        showError();
      }
    } catch (error) {
      console.log("Error in handle Response function");
      showError();
    }
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json", // Filter for JSON files
        multiple: false, // Allow only single file selection
      });

      if (!result.canceled) {
        console.log(result);

        // Now, let's read the content of the selected file using FileSystem
        const menu = await readFile(result.assets[0].uri);
        return { menu, fileName: result.assets[0].name };
      } else {
        showError("file pick cancelled");
      }
    } catch (err) {
      showError("Error picking file: " + err.message);
      console.error("Error picking file:", err);
    }
  };

  const readFile = async (fileUri) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const parsedJson = JSON.parse(fileContent);
      // console.log(parsedJson, "\n", fileContent, "\n", typeof fileContent);
      return parsedJson;
    } catch (e) {
      showError("Error reading or parsing JSON file: " + e.message);
      console.error("Error reading or parsing JSON file:", e);
    }
  };

  return {
    fetchWithTimeOut,
    handleResponse,
    handleResponseError,
    handleFilePicker,
  };
};

export default useHelpers;

// const getBaseUrl = () =>
//   process.env.APP_VARIANT === "dev"
//     ? process.env.EXPO_PUBLIC_BASE_API_URL_DEVELOPEMENT
//     : process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION;
