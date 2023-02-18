import { Collapse } from "@douyinfe/semi-ui";
import { IconComponent } from "@douyinfe/semi-icons";

export function DesignModule() {
  return (
    <>
      <Collapse keepDOM defaultActiveKey={["1", "2"]}>
        <Collapse.Panel
          header={
            <span className="">
              <IconComponent />
              整体风格
            </span>
          }
          itemKey="1"
        >
          <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" itemKey="2">
          <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" itemKey="3">
          <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
        </Collapse.Panel>
      </Collapse>
    </>
  );
}