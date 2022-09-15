import React, { FC, PropsWithChildren, useMemo } from "react";
import useSafeArea from "../../hooks/useSafeArea";

const SafeAreaView: FC<PropsWithChildren<{}>> = ({ children }) => {
    const insets = useSafeArea()?.insets;
    console.log("INSEEETS: ", insets);
    const styles = useMemo(
        () =>
            insets
                ? {
                      flex: 1,
                      paddingTop: insets.top,
                      paddingBottom: insets.bottom,
                      paddingLeft: insets.left,
                      paddingRight: insets.right,
                  }
                : {},
        [insets]
    );
    return <div style={styles}>{children}</div>;
};

export default SafeAreaView;
