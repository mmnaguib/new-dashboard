import axios from "axios";
import axiosInstance from "../utils/AxiosInstance";
const token =
  "B-ErTKp-e09arcO3Q4tnB1LW6kaQqK89OFvV_KTmkXK8n7-a3dNNbDmc53GlnVO4uBRZpmwcy1hp23NYIsGrtc4IVlvxT11Vs15i62B1tKl_4sGvi_NZtWoZgPjUw5uu1wJBWYYJskf7K5tSEtTfD2kGo3Jttqav2pkZIC10ULIFHG2tHy1Se8pjt29mH7-ZifLD41plDBKTlUw5c5KhFPF00ELhBNbERWG0dm1LLlqj5fTCB39ev-WSHWNBS7YAFWsqC1Oa96NV1d0u8ajYQ6fltmvDMPDTGNUxtKv0YUTRIKbGfnT-Cqd4DYoio-2Cbl5hZken5xm9kn0uQdqiO9vdcCuN14pZSfIMn2ph4eKhfWBrq8YonnxViUg55t8B8wJq6n9Tf_6iYBZKeT0YLDOswsp532ZRfLNTMRVz9MqAfYyVQfXPUUjf74CYFdH8MX6Fo1YpxhQ4Siyh2bjyDbTAKDEu2Gv2cfV4Urw4OuT4Kh11IWzuYQcl-Vuz7Ut5z781zI-buhN7_rE69uvP6OYF1NG_mjNbCR0N7q7F9peBozojWf_prW4bNSB5n5bvFb2zQvp1wP5tFkOdWQX0Zcfv9H5FNSMoJlq5fwdrcu9G0bSinazQzBAIcRrPmVbip2b8QZvCTnZgoZ7ZmfXvnrQScLhUW_7nMl0ax23gzk0rxpdb";
const PaymentService = {
  InitiatePayment: async (InvoiceAmount: number, CurrencyIso: string) => {
    try {
      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://apitest.myfatoorah.com/v2/InitiatePayment`,
        { InvoiceAmount, CurrencyIso },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // إعادة البيانات
    } catch (error: any) {
      console.error(
        "Error initiating payment:",
        error?.response?.data || error.message
      );
      throw new Error("Failed to initiate payment");
    }
  },
};

export default PaymentService;
