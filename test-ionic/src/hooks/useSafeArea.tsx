import React, { useEffect, useState } from "react";
import { SafeArea, SafeAreaInsets } from "capacitor-plugin-safe-area";

const useSafeArea = (): SafeAreaInsets | undefined => {
    const [insets, setInsets] = useState<SafeAreaInsets>();
    useEffect(() => {
        SafeArea.getSafeAreaInsets().then((data) => {
            console.log(insets)
            setInsets(data);
        });
    }, []);
    return insets;
};

export default useSafeArea;
