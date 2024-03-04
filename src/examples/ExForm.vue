<script setup lang="ts">
import { ref } from 'vue';
import { CheckBox, Form, Input, InputGroup, Textarea, Button, ActionsBar } from '../components';

const rememberMe = ref(false);
</script>

<template>
  <Form>
    <template #header>
      <h4>Form Validation</h4>
      <p>Basic Form data control. Includes layout, initial values, validation and submit.</p>
    </template>
    <InputGroup label="Username :" error="This area required" label-for="password">
      <Input placeholder="Username" type="text" name="username" />
    </InputGroup>

    <InputGroup label="Password :" label-for="password">
      <Input id="password" placeholder="Password" type="password" name="password" />
    </InputGroup>

    <InputGroup label="Message :">
      <Textarea placeholder="Message" />
    </InputGroup>

    <CheckBox v-model="rememberMe" label="Remember Me" />
    <ActionsBar>
      <Button label="Save" disabled />
      <Button :outline="true" label="Cancel" />
    </ActionsBar>
  </Form>
</template>