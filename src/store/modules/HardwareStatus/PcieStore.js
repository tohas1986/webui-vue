import api from '@/store/api';
import i18n from '@/i18n';

const PcieStore = {
    namespaced: true,
    state: {
      pcie: [],
    },
    getters: {
      pcie: (state) => state.pcie,
    },
    mutations: {
      setPcieInfo: (state, data) => {
        state.pcie = data.map(({ data }) => {
          const {
            Id,
            Status = {},
            VendorID,
            DeviceID,
            SparePartNumber,
            Model,
            Description,
          } = data;
          return {
            id: Id,
            health: Status.Health,
            vendorID: VendorID,
            deviceID: DeviceID,
            statusState: Status.State,
            sparePartNumber: SparePartNumber,
            model: Model,
            description: Description,
            identifyLed: LocationIndicatorActive,
            uri: data['@odata.id'],
          };
        });
      },
    },
    actions: {
      async getPcie({ commit }) {
        return await api
          .get('/redfish/v1/Systems/system/PCIeDevices')        //Check it in Redfish implementation!!!
          .then(({ data: { Members } }) => {
            const promises = Members.map((item) => api.get(item['@odata.id']));
            return api.all(promises);
          })
          .then((response) => commit('setPcieInfo', response))
          .catch((error) => console.log(error));
      },
      async updateIdentifyLedValue({ dispatch }, led) {
        const uri = led.uri;
        const updatedIdentifyLedValue = {
          LocationIndicatorActive: led.identifyLed,
        };
        return await api.patch(uri, updatedIdentifyLedValue).catch((error) => {
          dispatch('getPcie');
          console.log('error', error);
          if (led.identifyLed) {
            throw new Error(i18n.t('pageInventory.toast.errorEnableIdentifyLed'));
          } else {
            throw new Error(
              i18n.t('pageInventory.toast.errorDisableIdentifyLed')
            );
          }
        });
      },
    },
  };
  
  export default PcieStore;