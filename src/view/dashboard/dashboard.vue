<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
    <a-card title="Default size card" style="width: 300px">
      <template #extra><a href="#">more</a></template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>

    <a-descriptions title="User Info" bordered>
      <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
      <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
      <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
      <a-descriptions-item label="Usage Time" :span="2">2019-04-24 18:00:00</a-descriptions-item>
      <a-descriptions-item label="Status" :span="3">
        <a-badge status="processing" text="Running" />
      </a-descriptions-item>
      <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
      <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
      <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>
      <a-descriptions-item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </a-descriptions-item>
    </a-descriptions>

    <a-space direction="vertical" :size="32">
      <a-space wrap :size="16">
        <a-avatar :size="64">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-avatar size="large">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-avatar>
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-avatar size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-space>
      <a-space wrap :size="16">
        <a-avatar shape="square" :size="64">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-avatar shape="square" size="large">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-avatar shape="square">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-avatar shape="square" size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-space>
    </a-space>
    <a-result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <a-button key="console" type="primary">Go Console</a-button>
        <a-button key="buy">Buy Again</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true
})
const onFinish = (values: any) => {
  console.log("Success:", values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo)
}
</script>

<style scoped></style>
