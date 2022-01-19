import { createElement, useCallback } from "react";
import { CellRenderer } from "../components/Table";
import { ColumnsType } from "../../typings/DataGrid2Props";
import classNames from "classnames";

interface CellRendererHookProps {
    columns: ColumnsType[];
}

export function useCellRenderer({ columns }: CellRendererHookProps): CellRenderer {
    const renderer: CellRenderer = (renderWrapper, value, columnIndex) => {
        const column = columns[columnIndex];
        const title = column.tooltip && column.tooltip.get(value)?.value;
        let content;

        if (column.showContentAs === "attribute") {
            content = (
                <span title={title} className="td-text">
                    {column.attribute?.get(value)?.displayValue ?? ""}
                </span>
            );
        } else if (column.showContentAs === "dynamicText") {
            content = (
                <span title={title} className="td-text">
                    {column.dynamicText?.get(value)?.value ?? ""}
                </span>
            );
        } else {
            content = column.content?.get(value);
        }

        return renderWrapper(
            content,
            classNames(`align-column-${column.alignment}`, column.columnClass?.get(value)?.value, {
                "wrap-text": column.wrapText
            })
        );
    };

    return useCallback(renderer, [columns]);
}
