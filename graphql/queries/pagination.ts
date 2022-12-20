import { gql } from "@apollo/client";

export const PAGINATION = gql`
  query Pagination($pubkey: String!, $page: PageInput, $order: OrderChannelInput) {
    getNode(pubkey: $pubkey) {
      graph_info {
        channels {
          channel_list(page: $page, order: $order) {
            pagination {
              limit
              offset    
            }
            list {
              block_age
              capacity
              chan_point
              last_update
              last_update_date
              long_channel_id
              node1_policy {
                disabled
                fee_base_msat
                fee_rate_milli_msat
                last_update
                max_htlc_msat
                min_htlc
                time_lock_delta
              }
              node1_pub
              node2_policy {
                disabled
                fee_base_msat
                fee_rate_milli_msat
                last_update
                max_htlc_msat
                min_htlc
                time_lock_delta
              }
              node2_pub
              short_channel_id
              node2_info {
                node {
                  alias
                }
              }
            }
          }
        }
      }
    }
  }
`;