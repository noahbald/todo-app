var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 48,
          columnNumber: 4
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 97,
          columnNumber: 4
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});

// css-bundle-update-plugin-ns:C:\Users\noahw\Documents\Projects\todo-app\todo-app\node_modules\@remix-run\css-bundle\dist\esm\index.js
var cssBundleHref = "/build/css-bundle-PTSXD3ED.css";

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(
        "meta",
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 21,
          columnNumber: 5
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 25,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 19,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 31,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 32,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 28,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 18,
    columnNumber: 3
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});

// app/components/Todo/index.tsx
import React10 from "react";

// app/hooks/useMarkdown.ts
import React from "react";
import { marked } from "marked";
import sanitizeHTML from "sanitize-html";
var useMarkdown = (markdown) => React.useMemo(() => {
  let dangerousHTML = marked.parse(markdown);
  return sanitizeHTML(dangerousHTML);
}, [markdown]), useMarkdown_default = useMarkdown;

// app/types/status.ts
var statusTransitions = {
  ["In progress" /* In progress */]: "Completed" /* Completed */,
  ["Completed" /* Completed */]: "In progress" /* In progress */
};

// app/icons/check.svg.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var Check = () => /* @__PURE__ */ jsxDEV3(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsxDEV3("path", { fill: "none", d: "M0 0h24v24H0V0zm0 0h24v24H0V0z" }, void 0, !1, {
        fileName: "app/icons/check.svg.tsx",
        lineNumber: 13,
        columnNumber: 3
      }, this),
      /* @__PURE__ */ jsxDEV3("path", { d: "M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }, void 0, !1, {
        fileName: "app/icons/check.svg.tsx",
        lineNumber: 14,
        columnNumber: 3
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/icons/check.svg.tsx",
    lineNumber: 4,
    columnNumber: 2
  },
  this
), check_svg_default = Check;

// app/icons/edit.svg.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var Edit = () => /* @__PURE__ */ jsxDEV4(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsxDEV4("path", { fill: "none", d: "M0 0h24v24H0z" }, void 0, !1, {
        fileName: "app/icons/edit.svg.tsx",
        lineNumber: 13,
        columnNumber: 3
      }, this),
      /* @__PURE__ */ jsxDEV4("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" }, void 0, !1, {
        fileName: "app/icons/edit.svg.tsx",
        lineNumber: 14,
        columnNumber: 3
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/icons/edit.svg.tsx",
    lineNumber: 4,
    columnNumber: 2
  },
  this
), edit_svg_default = Edit;

// app/icons/delete.svg.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var Delete = () => /* @__PURE__ */ jsxDEV5(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsxDEV5("path", { fill: "none", d: "M0 0h24v24H0z" }, void 0, !1, {
        fileName: "app/icons/delete.svg.tsx",
        lineNumber: 13,
        columnNumber: 3
      }, this),
      /* @__PURE__ */ jsxDEV5("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" }, void 0, !1, {
        fileName: "app/icons/delete.svg.tsx",
        lineNumber: 14,
        columnNumber: 3
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/icons/delete.svg.tsx",
    lineNumber: 4,
    columnNumber: 2
  },
  this
), delete_svg_default = Delete;

// app/icons/unchecked.svg.tsx
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var Unchecked = () => /* @__PURE__ */ jsxDEV6(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsxDEV6("path", { fill: "none", d: "M0 0h24v24H0z" }, void 0, !1, {
        fileName: "app/icons/unchecked.svg.tsx",
        lineNumber: 13,
        columnNumber: 3
      }, this),
      /* @__PURE__ */ jsxDEV6("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }, void 0, !1, {
        fileName: "app/icons/unchecked.svg.tsx",
        lineNumber: 14,
        columnNumber: 3
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/icons/unchecked.svg.tsx",
    lineNumber: 4,
    columnNumber: 2
  },
  this
), unchecked_svg_default = Unchecked;

// app/components/TodoItem/index.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var TodoItem = ({
  title,
  description,
  notes,
  priority: priority2,
  deadline,
  status: status2,
  onEdit,
  onDelete,
  onSetStatus
}) => {
  let sanitizedDescriptionHTML = useMarkdown_default(description);
  return /* @__PURE__ */ jsxDEV7("div", { className: "todo-item", children: [
    /* @__PURE__ */ jsxDEV7("div", { className: "status-bar of-todo-item", children: [
      /* @__PURE__ */ jsxDEV7(
        "button",
        {
          className: "complete",
          onClick: () => onSetStatus(statusTransitions[status2]),
          children: [
            status2 === "Completed" ? /* @__PURE__ */ jsxDEV7(check_svg_default, {}, void 0, !1, {
              fileName: "app/components/TodoItem/index.tsx",
              lineNumber: 47,
              columnNumber: 32
            }, this) : /* @__PURE__ */ jsxDEV7(unchecked_svg_default, {}, void 0, !1, {
              fileName: "app/components/TodoItem/index.tsx",
              lineNumber: 47,
              columnNumber: 44
            }, this),
            "Mark as ",
            statusTransitions[status2]
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/TodoItem/index.tsx",
          lineNumber: 43,
          columnNumber: 5
        },
        this
      ),
      /* @__PURE__ */ jsxDEV7("span", { className: `chip priority ${priority2}`, children: priority2 }, void 0, !1, {
        fileName: "app/components/TodoItem/index.tsx",
        lineNumber: 50,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("button", { className: "edit", onClick: onEdit, children: [
        /* @__PURE__ */ jsxDEV7(edit_svg_default, {}, void 0, !1, {
          fileName: "app/components/TodoItem/index.tsx",
          lineNumber: 52,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV7("span", { className: "visually-hidden", onClick: onEdit, children: "Edit" }, void 0, !1, {
          fileName: "app/components/TodoItem/index.tsx",
          lineNumber: 53,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/TodoItem/index.tsx",
        lineNumber: 51,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("button", { className: "delete", onClick: onDelete, children: [
        /* @__PURE__ */ jsxDEV7(delete_svg_default, {}, void 0, !1, {
          fileName: "app/components/TodoItem/index.tsx",
          lineNumber: 58,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV7("span", { className: "visually-hidden", children: "Delete" }, void 0, !1, {
          fileName: "app/components/TodoItem/index.tsx",
          lineNumber: 59,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/TodoItem/index.tsx",
        lineNumber: 57,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/TodoItem/index.tsx",
      lineNumber: 42,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV7("h2", { children: title }, void 0, !1, {
      fileName: "app/components/TodoItem/index.tsx",
      lineNumber: 62,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV7("p", { children: deadline.toLocaleDateString() }, void 0, !1, {
      fileName: "app/components/TodoItem/index.tsx",
      lineNumber: 63,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV7(
      "div",
      {
        className: "description of-todo-item",
        dangerouslySetInnerHTML: { __html: sanitizedDescriptionHTML }
      },
      void 0,
      !1,
      {
        fileName: "app/components/TodoItem/index.tsx",
        lineNumber: 64,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7("ul", { className: "notes", children: notes.map(
      (note, i) => /* @__PURE__ */ jsxDEV7("li", { children: note }, i, !1, {
        fileName: "app/components/TodoItem/index.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this)
    ) }, void 0, !1, {
      fileName: "app/components/TodoItem/index.tsx",
      lineNumber: 68,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV7("hr", {}, void 0, !1, {
      fileName: "app/components/TodoItem/index.tsx",
      lineNumber: 73,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/TodoItem/index.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
}, TodoItem_default = TodoItem;

// app/components/TodoTemplate/index.tsx
import React3 from "react";

// app/types/priority.ts
var priority = /* @__PURE__ */ ((priority2) => (priority2[priority2.low = 0] = "low", priority2[priority2.medium = 1] = "medium", priority2[priority2.high = 2] = "high", priority2))(priority || {}), priority_default = priority;

// app/components/TodoTemplate/useHandleTemplateSubmit.ts
import React2 from "react";
var useHandleTemplateSubmit = ({
  onTemplateSubmit,
  initialInputs
}) => React2.useCallback(
  (event) => {
    let $target = event.target;
    if (!($target instanceof HTMLFormElement))
      return;
    event.preventDefault(), event.stopPropagation();
    let formData = new FormData($target), formObject = Object.fromEntries(
      formData
    ), notes = Object.keys(formObject).filter((key) => key.startsWith("note-")).map(
      (key) => formObject[key]
    );
    onTemplateSubmit({
      ...initialInputs,
      title: formObject.title,
      description: formObject.description,
      deadline: new Date(formObject.deadline),
      priority: formObject.priority,
      status: (initialInputs == null ? void 0 : initialInputs.status) || "In progress",
      id: (initialInputs == null ? void 0 : initialInputs.id) || crypto.randomUUID(),
      notes: notes || []
    });
  },
  [onTemplateSubmit, initialInputs]
), useHandleTemplateSubmit_default = useHandleTemplateSubmit;

// app/components/TodoTemplate/index.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var TodoTemplate = ({
  initialInputs,
  onTemplateSubmit
}) => {
  let [notesLength, setNotesLength] = React3.useState(
    (initialInputs == null ? void 0 : initialInputs.notes.length) || 0
  ), handleTemplateSubmit = useHandleTemplateSubmit_default({
    onTemplateSubmit,
    initialInputs
  });
  return /* @__PURE__ */ jsxDEV8("form", { className: "todo-template", onSubmit: handleTemplateSubmit, children: [
    /* @__PURE__ */ jsxDEV8("h2", { children: [
      initialInputs ? "Edit an" : "Create a new",
      " item"
    ] }, void 0, !0, {
      fileName: "app/components/TodoTemplate/index.tsx",
      lineNumber: 28,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV8("label", { htmlFor: "title", children: "Title" }, void 0, !1, {
      fileName: "app/components/TodoTemplate/index.tsx",
      lineNumber: 29,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV8(
      "input",
      {
        id: "title",
        name: "title",
        type: "text",
        required: !0,
        placeholder: "My task",
        defaultValue: initialInputs == null ? void 0 : initialInputs.title
      },
      void 0,
      !1,
      {
        fileName: "app/components/TodoTemplate/index.tsx",
        lineNumber: 30,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV8("label", { htmlFor: "description", children: "Description" }, void 0, !1, {
      fileName: "app/components/TodoTemplate/index.tsx",
      lineNumber: 38,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV8(
      "textarea",
      {
        id: "description",
        name: "description",
        required: !0,
        placeholder: "> My description (you can use markdown here)",
        defaultValue: initialInputs == null ? void 0 : initialInputs.description
      },
      void 0,
      !1,
      {
        fileName: "app/components/TodoTemplate/index.tsx",
        lineNumber: 39,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV8("label", { htmlFor: "deadline", children: "Deadline" }, void 0, !1, {
      fileName: "app/components/TodoTemplate/index.tsx",
      lineNumber: 46,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV8(
      "input",
      {
        id: "deadline",
        name: "deadline",
        type: "date",
        required: !0,
        defaultValue: initialInputs == null ? void 0 : initialInputs.deadline.toISOString().split("T")[0]
      },
      void 0,
      !1,
      {
        fileName: "app/components/TodoTemplate/index.tsx",
        lineNumber: 47,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV8("div", { role: "radiogroup", "aria-labelledby": "priority", children: [
      /* @__PURE__ */ jsxDEV8("div", { id: "priority", "aria-hidden": !0, children: "Priority" }, void 0, !1, {
        fileName: "app/components/TodoTemplate/index.tsx",
        lineNumber: 57,
        columnNumber: 5
      }, this),
      Object.entries(priority_default).filter(
        ([priorityName]) => Number.isNaN(Number(priorityName))
      ).map(
        ([priorityName, priority2]) => /* @__PURE__ */ jsxDEV8("label", { htmlFor: priorityName, children: [
          /* @__PURE__ */ jsxDEV8(
            "input",
            {
              id: priorityName,
              name: "priority",
              type: "radio",
              required: !0,
              defaultChecked: (initialInputs == null ? void 0 : initialInputs.priority) === priority2,
              value: priorityName
            },
            void 0,
            !1,
            {
              fileName: "app/components/TodoTemplate/index.tsx",
              lineNumber: 66,
              columnNumber: 8
            },
            this
          ),
          priorityName
        ] }, priority2, !0, {
          fileName: "app/components/TodoTemplate/index.tsx",
          lineNumber: 65,
          columnNumber: 9
        }, this)
      )
    ] }, void 0, !0, {
      fileName: "app/components/TodoTemplate/index.tsx",
      lineNumber: 56,
      columnNumber: 4
    }, this),
    Array.from(
      { length: notesLength },
      (_, i) => {
        var _a;
        return /* @__PURE__ */ jsxDEV8(React3.Fragment, { children: [
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: `note-${i}`, children: [
            "Note ",
            i + 1
          ] }, void 0, !0, {
            fileName: "app/components/TodoTemplate/index.tsx",
            lineNumber: 82,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ jsxDEV8(
            "input",
            {
              id: `note-${i}`,
              name: `note-${i}`,
              required: !0,
              defaultValue: (_a = initialInputs == null ? void 0 : initialInputs.notes) == null ? void 0 : _a[i]
            },
            void 0,
            !1,
            {
              fileName: "app/components/TodoTemplate/index.tsx",
              lineNumber: 83,
              columnNumber: 6
            },
            this
          ),
          i === notesLength - 1 && /* @__PURE__ */ jsxDEV8(
            "button",
            {
              type: "button",
              onClick: () => setNotesLength(notesLength - 1),
              children: [
                "Remove note ",
                i + 1
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/TodoTemplate/index.tsx",
              lineNumber: 90,
              columnNumber: 9
            },
            this
          )
        ] }, i, !0, {
          fileName: "app/components/TodoTemplate/index.tsx",
          lineNumber: 81,
          columnNumber: 7
        }, this);
      }
    ),
    /* @__PURE__ */ jsxDEV8(
      "button",
      {
        type: "button",
        onClick: () => setNotesLength(notesLength + 1),
        children: "Add note"
      },
      void 0,
      !1,
      {
        fileName: "app/components/TodoTemplate/index.tsx",
        lineNumber: 99,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV8("button", { children: "Submit" }, void 0, !1, {
      fileName: "app/components/TodoTemplate/index.tsx",
      lineNumber: 105,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV8("hr", {}, void 0, !1, {
      fileName: "app/components/TodoTemplate/index.tsx",
      lineNumber: 106,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/TodoTemplate/index.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}, TodoTemplate_default = TodoTemplate;

// app/components/Todo/useHandleTodoSubmit.ts
import React4 from "react";
var useHandleTodoSubmit = ({
  todoItems,
  setTodoItems
}) => React4.useCallback(
  (entry2, postSubmission = !0) => {
    let todoItem = {
      ...entry2,
      notes: entry2.notes || [],
      onEdit() {
      },
      onDelete() {
      },
      onSetStatus() {
      }
    };
    setTodoItems([...todoItems, todoItem]), postSubmission && fetch("api/todos", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify([entry2])
    });
  },
  [todoItems, setTodoItems]
), useHandleTodoSubmit_default = useHandleTodoSubmit;

// app/components/Todo/useHandleTodoUpdate.ts
import React5 from "react";
var useHandleTodoUpdate = ({
  todoItems,
  setTodoItems,
  editIndex,
  setEditIndex
}) => React5.useCallback(
  (entry2) => {
    setTodoItems([
      ...todoItems.slice(0, editIndex),
      entry2,
      ...todoItems.slice(editIndex + 1)
    ]), setEditIndex(-1), fetch("/api/todos", {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify(entry2)
    });
  },
  [todoItems, setTodoItems, editIndex, setEditIndex]
), useHandleTodoUpdate_default = useHandleTodoUpdate;

// app/components/Todo/useSortedTodoItems.ts
import React6 from "react";
var useSortedTodoItems = (todoItems) => React6.useMemo(() => todoItems.sort((a, b) => Number(a.deadline) - Number(b.deadline)).sort((a, b) => a.priority - b.priority), [todoItems]), useSortedTodoItems_default = useSortedTodoItems;

// app/components/Todo/useTodoData.ts
import React7 from "react";
var useTodoData = (setTodos) => {
  React7.useEffect(() => {
    (async () => {
      let todos = await (await fetch("/api/todos")).json();
      setTodos(
        todos.map((todo) => ({
          ...todo,
          deadline: new Date(todo.deadline),
          onEdit() {
          },
          onDelete() {
          },
          onSetStatus() {
          },
          onComplete() {
          }
        }))
      );
    })();
  }, []);
}, useTodoData_default = useTodoData;

// app/components/Todo/useHandleTodoDelete.ts
import React8 from "react";
var useHandleTodoDelete = ({
  todoItems,
  setTodoItems
}) => React8.useCallback(
  (i) => {
    setTodoItems([...todoItems.slice(0, i), ...todoItems.slice(i + 1)]), fetch("/api/todos", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify([{ id: todoItems[i].id }])
    });
  },
  [todoItems, setTodoItems]
), useHandleTodoDelete_default = useHandleTodoDelete;

// app/components/Todo/useHandleTodoSetStatus.ts
import React9 from "react";
function useHandleTodoSetStatus({
  todoItems,
  setTodoItems
}) {
  return React9.useCallback(
    (status2, i) => {
      let updatedTodoItems = todoItems.slice();
      updatedTodoItems[i].status = status2, setTodoItems(updatedTodoItems), fetch("api/todos", {
        method: "PUT",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify(updatedTodoItems[i])
      });
    },
    [todoItems, setTodoItems]
  );
}
var useHandleTodoSetStatus_default = useHandleTodoSetStatus;

// app/components/Todo/index.tsx
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var Todo = () => {
  let [editIndex, setEditIndex] = React10.useState(-1), [todoItems, setTodoItems] = React10.useState([]), handleTodoSubmit = useHandleTodoSubmit_default({ todoItems, setTodoItems }), handleTodoUpdate = useHandleTodoUpdate_default({
    todoItems,
    setTodoItems,
    editIndex,
    setEditIndex
  }), handleTodoSetStatus = useHandleTodoSetStatus_default({
    todoItems,
    setTodoItems
  }), handleTodoDelete = useHandleTodoDelete_default({ todoItems, setTodoItems }), sortedTodoItems = useSortedTodoItems_default(todoItems);
  return useTodoData_default(setTodoItems), /* @__PURE__ */ jsxDEV9("div", { className: "todo", children: [
    sortedTodoItems.map(
      (todoItem, i) => i === editIndex ? /* @__PURE__ */ jsxDEV9(
        TodoTemplate_default,
        {
          onTemplateSubmit: handleTodoUpdate,
          initialInputs: todoItem
        },
        todoItem.id,
        !1,
        {
          fileName: "app/components/Todo/index.tsx",
          lineNumber: 38,
          columnNumber: 7
        },
        this
      ) : /* @__PURE__ */ jsxDEV9(
        TodoItem_default,
        {
          ...todoItem,
          onEdit: () => setEditIndex(i),
          onDelete: () => handleTodoDelete(i),
          onSetStatus: (status2) => handleTodoSetStatus(status2, i)
        },
        todoItem.id,
        !1,
        {
          fileName: "app/components/Todo/index.tsx",
          lineNumber: 44,
          columnNumber: 7
        },
        this
      )
    ),
    editIndex === -1 && /* @__PURE__ */ jsxDEV9(TodoTemplate_default, { onTemplateSubmit: handleTodoSubmit }, void 0, !1, {
      fileName: "app/components/Todo/index.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Todo/index.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}, Todo_default = Todo;

// app/routes/_index.tsx
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Todo app" },
  { name: "description", content: "Todo app" }
];
function Index() {
  return /* @__PURE__ */ jsxDEV10("div", { className: "page", children: [
    /* @__PURE__ */ jsxDEV10("h1", { children: "Todo App" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 29,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV10(Todo_default, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 30,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-G3HIM3P2.js", imports: ["/build/_shared/chunk-JXHNNPNR.js", "/build/_shared/chunk-H36SQQE5.js", "/build/_shared/chunk-JKUASME7.js", "/build/_shared/chunk-ZOMPIGGR.js", "/build/_shared/chunk-ZNB6WRFP.js", "/build/_shared/chunk-N4FG5RPV.js", "/build/_shared/chunk-TVZC3ZTX.js", "/build/_shared/chunk-RODUX5XG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-IHXR2RZY.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-ZW5ZQL3U.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "0ab79d66", hmr: { runtime: "/build/_shared\\chunk-ZNB6WRFP.js", timestamp: 1694166122947 }, url: "/build/manifest-0AB79D66.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { v2_dev: !0, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
};
/*! Bundled license information:

@remix-run/css-bundle/dist/esm/index.js:
  (**
   * @remix-run/css-bundle v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=index.js.map
