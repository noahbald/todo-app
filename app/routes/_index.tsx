import type { V2_MetaFunction } from "@remix-run/node";

import 'open-props/media.min.css';
import 'open-props/fonts.min.css';
import 'open-props/sizes.min.css';
import 'open-props/easings.min.css';
import 'open-props/zindex.min.css';
import 'open-props/shadows.min.css';
import 'open-props/aspects.min.css';
import 'open-props/colors.min.css';
import 'open-props/gradients.min.css';
import 'open-props/animations.min.css';
import 'open-props/borders.min.css';
import 'open-props/normalize.min.css';
import 'open-props/buttons.min.css';
import '~/components/index.css';
import Todo from "~/components/Todo";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Todo app" },
        { name: "description", content: "Todo app" },
    ];
};

export default function Index() {

    return (
        <div className="page">
            <h1>Todo App</h1>
            <Todo />
        </div>
    );
}
