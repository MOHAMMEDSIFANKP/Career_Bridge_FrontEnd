import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { Document, Page, pdfjs } from "react-pdf";

function OpenToCv({ isOpen, onClose, path }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  function goToPreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Dialog open={isOpen} handler={onClose} size={"md"}>
      <DialogHeader>Cv</DialogHeader>
      <DialogBody>
        <div className="">
          <div className="overflow-y-auto border border-gray-400 rounded-xl text-center ">
            <Document
              file={path}
              onLoadSuccess={onDocumentLoadSuccess}
              className="h-80"
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          <div>
            <p className="text-center text-black pt-2">
              Page {pageNumber} of {numPages}
            </p>
            <button className="px-2 py-1 border-2 rounded-xl border-purple-400 me-2" onClick={goToPreviousPage}>Prev</button>
            <button className="border rounded-xl px-3 py-1 bg-purple-600 text-white" onClick={goToNextPage}>Next</button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-1">
          <span className="text-gray-800">Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default OpenToCv;
