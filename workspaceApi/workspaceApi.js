export default class WorkspaceApi {


    openTabByRecordId(target, focus) {
        this.invokeWorkspaceAPI('openTab', {
            recordId: target,
            focus: focus
        });
    }

    openTabByUrl(url, focus) {
        this.invokeWorkspaceAPI('openTab', {
            url: url,
            focus: focus
        });
    }

    openTabByPageReference(pageReference, focus) {
        this.invokeWorkspaceAPI('openTab', {
            pageReference: pageReference,
            focus: focus
        });
    }

    async refreshFocusTab(includeSubtabs) {
        const tabInfo = await this.getFocusedTabInfo();
        this.invokeWorkspaceAPI('refreshTab', { tabId: tabInfo.tabId, includeAllSubtabs: includeSubtabs });
    }




    async closeFocusedTab() {
        const tabInfo = await this.getFocusedTabInfo();
        this.invokeWorkspaceAPI('closeTab', { tabId: tabInfo.tabId });
    }


    async getFocusedTabInfo() {
        const tabInfo = await this.invokeWorkspaceAPI('getFocusedTabInfo');
        console.log('getFocusedTabInfo>>' + tabInfo);
        return tabInfo;
    }

    // getEnclosingTabId does not seem to be implemented
    async getEnclosingTabId() {
        const tabInfo = await this.invokeWorkspaceAPI('getEnclosingTabId');
        console.log('getFocusedTabInfo>>' + tabInfo);
        return tabInfo;
    }

    // getEnclosingPrimaryTabId does not seem to be implemented
    async getEnclosingPrimaryTabId() {
        const tabInfo = await this.invokeWorkspaceAPI('getEnclosingPrimaryTabId');
        console.log('getEnclosingPrimaryTabId>>' + tabInfo);
        return tabInfo;
    }



    invokeWorkspaceAPI(methodName, methodArgs) {
        return new Promise((resolve, reject) => {
            const apiEvent = new CustomEvent("internalapievent", {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: {
                    category: "workspaceAPI",
                    methodName: methodName,
                    methodArgs: methodArgs,
                    callback: (err, response) => {
                        if (err) {
                            console.log('erreur' + err);
                            return reject(err);
                        } else {
                            return resolve(response);
                        }
                    }
                }
            });

            window.dispatchEvent(apiEvent);
        });
    }
}