import { useInterval } from "ahooks";
import { RefObject, useState } from "react";
import util from "./util";

export const useMxContext = (ref: RefObject<any>): mendix.lib.MxObject | undefined => {
    const [objs, setObjs] = useState<any[]>();

    const [interval, setInterval] = useState<number | null>(1000);

    useInterval(
        () => {
            if (ref.current) {
                setInterval(null);
                util(ref.current, d => {
                    setObjs(d);
                });
            }
        },
        interval,
        { immediate: true }
    );

    return objs && objs[0] ? objs[0][0][1].value.value : undefined;
};
