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
