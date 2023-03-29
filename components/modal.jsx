import { Button } from "../components/Button";
import Quiz from "../components/Quiz";
import { ConnectWalletInfo } from "./ConnectWalletInfo";

export function Modal(props) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/4 my-6 mx-auto max-w-4xl ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{props.title}</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto my-4 text-slate-500 text-lg leading-relaxed">
              {props.type == "quiz" ? (
                <Quiz />
              ) : props.type == "connectWalletInfo" ? (
                <ConnectWalletInfo />
              ) : (
                ""
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.handleClose()}
              >
                Close
              </button>
              <Button
                className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => props.handleClose()}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
