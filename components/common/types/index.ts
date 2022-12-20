export interface IChannel {
  block_age: number;
  capacity: string;
  chan_point: string;
  last_update: number;
  last_update_date: Date;
  long_channel_id: string;
  node1_policy: Policy;
  node1_pub: string;
  node2_policy: Policy;
  node2_pub: string;
  short_channel_id: string;
}

export interface Policy {
  disabled: boolean;
  fee_base_msat: string;
  fee_rate_milli_msat: string;
  last_update: Date;
  max_htlc_msat: string;
  min_htlc: string;
  time_lock_delta: number;
}